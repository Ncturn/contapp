import { useState, useEffect } from 'react';
import { getCollection } from '../utils/CollectionMethods';

const useCollection = (name) => {
  const [collection, setCollection] = useState({
    error: null,
    body: [],
  });
  useEffect(async () => {
    const data = await getCollection(name);
    setCollection(data);
  }, []);
  return [collection, setCollection];
};

export default useCollection;
