import { useUsersContext } from "./UsersContext";

const ListUsers = ({ onOpen }: { onOpen: (id: number) => void }) => {
  const { getUsers } = useUsersContext();

  return (
    <div>
      <ul>
        {getUsers().map((user, index) => (
          <li key={index} onClick={() => onOpen(user.id)}>
            {user.name} | Friends: {user.friends.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
