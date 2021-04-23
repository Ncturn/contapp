import React, { useState } from 'react';
import { getCollection } from '../utils/CollectionApi';
import BalanceTable from '../components/BalanceTable';

const AccountBalance = () => {
  const [account, setAccount] = useState(
    {
      _id: '',
      identifier: '',
      description: '',
      level: '',
      type: '',
      keycontrol: '',
      balance: '',
      accounttype: '',
    },
  );
  const [policies, setPolicies] = useState([]);

  let identifierTimeout = null;
  const getPolicies = (identifier, date) => {
    identifierTimeout = setTimeout(async () => {
      const accountData = await getCollection('account', `?identifier=${identifier}`);
      if (accountData.body.length > 0) {
        const movements = await getCollection('policy', `?accountId=${accountData.body[0]._id}&date=${date}`);
        setAccount(accountData.body[0]);
        setPolicies(movements.body);
      }
    }, 1000);
  };
  const handleIdentifierChange = (event) => {
    clearTimeout(identifierTimeout);
    const month = document.getElementsByName('month')[0].value;
    const identifier = event.target.value;
    if (identifier && month) {
      const date = `2021-${month}-01`;
      getPolicies(identifier, date);
    }
  };
  const handleMonthChange = (event) => {
    clearTimeout(identifierTimeout);
    const month = event.target.value;
    const identifier = document.getElementsByName('identifier')[0].value;
    if (month && identifier) {
      const date = `2021-${month}-01`;
      getPolicies(identifier, date);
    }
  };
  return (
    <BalanceTable account={account} policies={policies} handleIdentifierChange={handleIdentifierChange} handleMonthChange={handleMonthChange} />
  );
};

export default AccountBalance;
