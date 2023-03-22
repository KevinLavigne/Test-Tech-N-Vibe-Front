function StationCard({ velib, goTo }) {
  return (
    <div className="flex bg-slate-300 rounded-3xl justify-between items-center">
      <div className="flex lg:flex-row items-center p-2">
        <h1 className=" text-left ">{velib.stationname}</h1>
      </div>
      <button
        type="button"
        className="bg-red-400 rounded-3xl font-medium p-2 px-4  w-1/5 m-2"
        onClick={() => goTo(velib.latitude, velib.longitude)}
      >
        Go to
      </button>
    </div>
  );
}
export default StationCard;
