import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  InputBase,
  Button,
  Box
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import EnhancedTableHead from "../../../../components/Table/EnhancedTableHead";
import StyledTableCell from "../../../../components/StyledTableCell";
import StyledTableRow from "../../../../components/StyledTableRow";
import {produce} from 'immer';
import {BillingItem} from "../../../../types/JobDocument"

interface BillingItemsTableProps {
  items: BillingItem[];
  setItems: React.Dispatch<React.SetStateAction<BillingItem[]>>;
  documentType: string;
}

const billingItemHeaders = [
  { id: 'index', label: '#', numeric: false, disablePadding: true },
  { id: 'name', label: 'Description', numeric: false, disablePadding: true },
  { id: 'quantity', label: 'Qty', numeric: true, disablePadding: true },
  { id: 'unitPrice', label: 'Unit Price', numeric: true, disablePadding: true },
  { id: 'discount', label: 'Markup(%)', numeric: true, disablePadding: true },
  { id: 'lineTotal', label: 'Line Total', numeric: true, disablePadding: true },
  { id: 'actions', label: '', numeric: false, disablePadding: true },
  { id: 'production', label: '', numeric: false, disablePadding: true }
];

const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T): number => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = <Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): ((a: Record<Key, any>, b: Record<Key, any>) => number) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = <T,>(array: T[], comparator: (a: T, b: T) => number): T[] =>
  array
    .map((el, index) => [el, index] as [T, number])
    .sort((a, b) => {
      const cmp = comparator(a[0], b[0]);
      return cmp !== 0 ? cmp : a[1] - b[1];
    })
    .map((el) => el[0]);

const ProjectItemsTable: React.FC<BillingItemsTableProps> = ({ items, setItems, documentType }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = (_event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleAddBillingItemsRow = () => {
    setItems([...items, { name: '', unitPrice: 0, quantity: 0, discount: 0, productionStatus: 'Pre Production' }]);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(items, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [items, order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ my: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={billingItemHeaders}
          />
          <TableBody>
            {visibleRows.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  <InputBase
                    fullWidth
                    multiline
                    placeholder="Name/Description"
                    value={item.name}
                    onChange={(e) =>
                      setItems((curr) =>
                        produce(curr, (draft) => {
                          draft[index].name = e.target.value;
                        })
                      )
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <InputBase
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      setItems((curr) =>
                        produce(curr, (draft) => {
                          draft[index].quantity = +e.target.value;
                        })
                      )
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <InputBase
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      setItems((curr) =>
                        produce(curr, (draft) => {
                          draft[index].unitPrice = +e.target.value;
                        })
                      )
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <InputBase
                    type="number"
                    value={item.discount}
                    onChange={(e) =>
                      setItems((curr) =>
                        produce(curr, (draft) => {
                          draft[index].discount = +e.target.value;
                        })
                      )
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <InputBase
                    disabled
                    value={(
                      item.quantity * item.unitPrice -
                      (item.quantity * item.unitPrice * (item.discount ?? 0)) / 100
                    ).toFixed(2)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() =>
                      setItems(items.filter((_, i) => i !== index))
                    }
                  >
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </StyledTableCell>
                {documentType === 'Order' && (
                  <StyledTableCell align="right">
                    <IconButton onClick={() => {/* custom order logic */}}>
                      <BuildCircleOutlinedIcon color="success" />
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddBillingItemsRow}
        >
          Add Item
        </Button>
      </Box>
    </>
  );
};

export default ProjectItemsTable;
