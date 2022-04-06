import { TableHead, TableRow, TableCell } from '@mui/material';

export default function LeaderboardHead({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell>{column}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
