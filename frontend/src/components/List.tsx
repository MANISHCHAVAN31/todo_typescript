import { useEffect, useState } from "react";

const List = () => {
  const [listData, setListData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  
  const loadListData = () => {
    listDataCall();
  };
  useEffect(() => {
    loadListData();
  }, [listData]);
  return <div></div>;
};

export default List;
