const Array2String = (data) => {
  let messages = "";
  for (const m in data.message) {
    messages = messages + data.message[m] + "<br/>";
  }
  return messages;
};

export const replaceOldRecord_Front = (oldArray, newRecord, recordId) => {
  const newArr = [...oldArray];
  const index = newArr.findIndex((x) => x.id == recordId);
  newArr[index] = newRecord;
  return newArr;
};
