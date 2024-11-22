import UserManagager from "./components/UserManagager";
import UsersProvider from "./components/UsersProvider";

function App() {
  return (
    <div>
      <UsersProvider>
        <UserManagager />
      </UsersProvider>
    </div>
  );
}

export default App;
