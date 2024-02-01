import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import './style.scss';
import { ProductAttributeType } from 'src/types/Product';

interface Props {
  row: ProductAttributeType;
  index: number;
  handelDeleteAttribute: (attributeId: number) => void;
  handleEditAttribute: (attributeId: ProductAttributeType) => void;
}
function Row(props: Props) {
  const { row, index, handelDeleteAttribute, handleEditAttribute } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="center" className="attribute-image">
          <img src={row.imageLink} alt="attribute" className="attribute-image-row" />
        </TableCell>
        <TableCell align="right">{row.material}</TableCell>
        <TableCell align="right">{row.origin}</TableCell>
        <TableCell align="right">{row.size}</TableCell>
        <TableCell align="right">{row.variation}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleEditAttribute(row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handelDeleteAttribute(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} className="collab-table-wrapper">
              <Typography variant="h6" gutterBottom component="div">
                Tồn kho
              </Typography>
              <Table size="small" aria-label="purchases" className="collab-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên kho</TableCell>
                    <TableCell>Giá nhập</TableCell>
                    <TableCell align="right">Giá bán</TableCell>
                    <TableCell align="right">Tồn kho</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.inventoryList?.map((inventoryItem, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {inventoryItem?.inventory?.name}
                      </TableCell>
                      <TableCell>{inventoryItem.costPrice.toLocaleString()}</TableCell>
                      <TableCell align="right">{inventoryItem.sellPrice.toLocaleString()}</TableCell>
                      <TableCell align="right">{inventoryItem.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface PropsTable {
  rows: ProductAttributeType[];
  onDeleteAttribute: (attributeId: number) => void;
  onEditAttribute: (attribute: ProductAttributeType) => void;
}

export default function CollapsibleTable(props: PropsTable) {
  const { rows, onDeleteAttribute, onEditAttribute } = props;
  return (
    <TableContainer component={Paper} className="origin-table">
      <Table aria-label="collapsible table" className="origin-table-wrapper">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>STT</TableCell>
            <TableCell align="center">Hình ảnh</TableCell>
            <TableCell align="right">Chất liệu</TableCell>
            <TableCell align="right">Xuất xứ</TableCell>
            <TableCell align="right">Kích cỡ</TableCell>
            <TableCell align="right">Màu sắc</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <Row
              key={index}
              row={row}
              index={index}
              handelDeleteAttribute={(attributeId: number) => onDeleteAttribute(attributeId)}
              handleEditAttribute={(attribute: ProductAttributeType) => onEditAttribute(attribute)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
