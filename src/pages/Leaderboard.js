import { useState, useEffect } from 'react';

import { Paper, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';

import firebaseApp from '../Firebase';
import { LeaderboardHead } from '../sections/@dashboard/leaderboard';
import Page from '../components/Page';

const TABLE_HEAD = ['Profile', 'Rank', 'Name', 'Water Drunk'];

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const db = getFirestore(firebaseApp);

    const docRef = doc(
      db,
      'leaderboard',
      new Date()
        .toLocaleString('en-US', { timeZone: 'America/New_York' })
        .split(',')[0]
        .replace(/\//g, '-')
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { users } = docSnap.data();
      setRows(users);
    }
  }, []);

  return (
    <Page title="Leaderboard | Watch Your Water">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }}>
          <LeaderboardHead columns={TABLE_HEAD} />
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">
                  <img src={row.imgURL} style={{ borderRadius: 50 }} alt="Profile" />
                </TableCell>
                <TableCell align="left">{i}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.waterDrunk}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}
