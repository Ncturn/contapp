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
  const handleIdentifierChange = (event) => {
    clearTimeout(identifierTimeout);
    identifierTimeout = setTimeout(async () => {
      const identifier = event.target.value;
      if (identifier !== '') {
        const accountData = await getCollection('account', `?identifier=${identifier}`);
        if (accountData.body.length > 0) {
          const movements = await getCollection('policy', `?accountId=${accountData.body[0]._id}`);
          setAccount(accountData.body[0]);
          setPolicies(movements.body);
        }
      }
    }, 1000);
  };
  return (
    <BalanceTable account={account} policies={policies} handleIdentifierChange={handleIdentifierChange} />
  );
};

export default AccountBalance;
