import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import COLORS from "../../constants/colors";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { stringCheckForTableCell } from "utils/StringCheck";
import { isHostAdmin, isSuperAdmin, isClientAdmin } from "utils/roleUtils";
import { useAppContext } from "ContextAPIs/appContext";
import {
  HeadCell,
  Order,
  TableFooter,
  TableHeader,
} from "components/commonComponent/Table";
import ActionMenu, {
  MenuType,
} from "components/commonComponent/Table/ActionMenu";
import { useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths } from "../../constants/commonEnums";

export default function Users() {
  let [searchParams, setSearchParams] = useSearchParams();

  const host_id = searchParams.get("host_id");
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: userList, isLoading } = useQuery(
    ["properties", page, rowsPerPage, searchText],
    () => getProperties(page, rowsPerPage, searchText)
  );

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("property");

  const navigate = useNavigate();

  const { user } = useAppContext();
  const classes = useStyles();
  const isAdmin = isSuperAdmin(user.roles) || isClientAdmin(user.roles);

  async function getProperties(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `/users/?page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

   
    const response = await client.get(getApiUrl);

    return response.data;
  }

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    //@ts-ignore
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function openUserDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.USERS}/${id}`);
  }

  function editPropertyDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.USERS}/${SubPaths.EDIT}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openUserDetails,
    },
    { label: "Edit", icon: <EditOutlinedIcon />, onClick: editPropertyDetails },
    // {
    //   label: "Delete",
    //   icon: <DeleteOutlineOutlinedIcon />,
    //   onClick: handleClick,
    // },
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      label: "Email",
      numeric: false,
      disablePadding: false,
    },
    { id: "address", label: "Address", numeric: false, disablePadding: false },
    {
      id: "contact_code",
      label: "Contact Code",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "contact",
      label: "contact_number",
      numeric: false,
      disablePadding: false,
    },
  ];

  function addProperty() {
    navigate(`/${AppPaths.USERS}/${SubPaths.ADD}`);
  }
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };
  return (
    <Box style={{ padding: "40px 24px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Users</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: 12
            // isAdmin || isHostAdmin(user.roles) ? 12 : 0
             }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search User by Name or Id"
            />
          </Box>
          {/* {isAdmin || isHostAdmin(user.roles) ? ( */}
            <Button
              variant="contained"
              style={{ background: COLORS.PRIMARY_COLOR }}
              onClick={addProperty}
            >
              <AddIcon />
              add user
            </Button>
          {/* ) : null} */}
        </Box>
      </Box>
      <Box className={classes.root}>
        <Table className={classes.table}>
          <TableHeader
            headings={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            shouldShowActionMenu={true}
          />
          <TableBody>
            {isLoading ? (
              <TableCell colSpan={8}>
                <LoadingScreen />
              </TableCell>
            ) : userList?.results.length ? (
              userList?.results.map((user: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{user.name}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {user.email}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{user.address}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{user.contact_code}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{user.contact_number}</Span>
                    </TableCell>
                    
                   
                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={user.id} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableCell colSpan={8}>
                <div className={classes.noDataView}>
                  <Span fontType="secondary">No Data Available</Span>
                </div>
              </TableCell>
            )}
          </TableBody>
        </Table>
        <TableFooter
          totalPages={Math.ceil(userList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
