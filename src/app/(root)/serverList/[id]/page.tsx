const ServerDetail = ({ params }: { params: { id: string } }) => {
  console.log("params", params);
  return <div className="text-black">{params.id}</div>;
};

export default ServerDetail;
