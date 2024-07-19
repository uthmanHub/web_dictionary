import NavBar from "./component/NavBar";
import Body from "./component/Body";

function App() {
  return (
    <div className='pt-10 '>
      <div className='max-w-[736px] container'>
        <NavBar />
        <Body />
      </div>
    </div>
  );
}

export default App;
