import { useState } from "react";
import ListUsers from "./ListUsers";
import Modal from "./modal/Modal";
import NewOrEditUser, { idNewUser } from "./NewOrEditUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "@/lib/utils";

const UserManagager = () => {
  const [operations, addOperations] = useState<number[]>([]);

  const businessLockLogic = (index: number, ops: number[]) => {
    return index < ops.length - 1;
  };

  const handleCloseElement = () => {
    operations.pop();
    addOperations([...operations]);
  };

  const handleNewOperation = () => {
    handleOpen(idNewUser);
  };

  const handleOpen = (userId: number) => {
    addOperations([...operations, userId]);
  };

  return (
    <div>
      {operations.length > 0 && (
        <Alert
          className="fixed bottom-0 right-0 m-4 max-w-md z-50"
          variant="warning"
        >
          <AlertDescription>
            {`Hai ${operations.length} operazioni in corso...`}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex w-full justify-between items-center border-b p-2">
        <div className="text-xl font-bold">List Users</div>

        <Button
          onClick={handleNewOperation}
          disabled={operations.some((i) => i == idNewUser)}
        >
          New User
        </Button>
      </div>

      {operations.map((operationId, index) => (
        <Dialog key={index} open={true}>
          <DialogContent
            style={{
              marginLeft: `${index * 25}px`,
              marginTop: `${index * 25}px`,
            }}
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            className={cn(
              businessLockLogic(index, operations) &&
                "border-red-500 border-2 bg-red-50"
            )}
          >
            <DialogTitle></DialogTitle>
            <NewOrEditUser
              onNewUser={handleNewOperation}
              onClose={handleCloseElement}
              userId={operationId}
              locked={businessLockLogic(index, operations)}
            />
          </DialogContent>
        </Dialog>
      ))}

      <ListUsers onOpen={handleOpen} />
    </div>
  );
};

export default UserManagager;

/* <div key={index}>
          <Modal
            openModal={true}
            style={{
              marginLeft: `${index * 25}px`,
              marginTop: `${index * 25}px`,
            }}
          >
            
          </Modal>
        </div> */
