import { useState } from "react";
import { getAdmins } from "../../services/Admin";
import { IAdmin } from "../../interfaces/admin";
import { useQuery } from "react-query";
import { notifications } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconSearch,
  IconSelector,
  IconTrash,
} from "@tabler/icons-react";
import {
  Center,
  Group,
  UnstyledButton,
  createStyles,
  Text,
  Box,
  Button,
  ScrollArea,
  Table,
  TextInput,
  Badge,
  ActionIcon,
  Tooltip,
  Modal,
  Select,
  Checkbox,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { openConfirmModal } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { IEmployee } from "../../interfaces/employee";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

const sampleData: IEmployee[] = [
  {
    _id: "1",
    id: "EMP-1002",
    firstName: "Pasindu",
    lastName: "Sandeepa",
    gender: "male",
    email: "pasindulakshanx@gmail.com",
    phone: "0771234567",
    role: "tax official",
    permissions: ["manage tax rates", "manage notices", "manage FAQs"],
    addedBy: "admin",
    lastUpdatedBy: "admin",
    isActive: "true",
    isFirstLogin: "false",
    isDeleted: "false",
    avatar: "",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  },
  {
    _id: "2",
    id: "EMP-1003",
    firstName: "Kasun",
    lastName: "Sandeepa",
    gender: "male",
    email: "kasun3456@gmail.com",
    phone: "0771323456",
    role: "support agent",
    permissions: ["manage notices", "manage FAQs"],
    addedBy: "admin",
    lastUpdatedBy: "admin",
    isActive: "true",
    isFirstLogin: "false",
    isDeleted: "false",
    avatar: "",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  },
];

const Th: React.FC<ThProps> = ({ children, reversed, sorted, onSort }) => {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
};

//Filter Data
function filterData(data: IEmployee[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => {
      return item[key].toString().toLowerCase().includes(query);
    })
  );
}

//Sort Data
export function sortData(
  data: IEmployee[],
  payload: { sortBy: keyof IEmployee | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (sortBy === "permissions") {
        return 0;
      }

      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const ManageEmployees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>(sampleData);
  const [sortedEmployees, setSortedEmployees] = useState(employees);
  const [sortBy, setSortBy] = useState<keyof IEmployee | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [search, setSearch] = useState("");
  const [addOpened, setAddOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);

  //Open delete modal
  const openDeleteModal = (id: string) =>
    openConfirmModal({
      title: "Delete this employee?",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this employee? This action cannot be
          undone.
        </Text>
      ),
      labels: {
        confirm: "Delete employee",
        cancel: "No don't delete it",
      },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {},
    });

  const setSorting = (field: keyof IEmployee) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedEmployees(
      sortData(employees, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedEmployees(
      sortData(employees, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  //declare add form
  const addForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      role: "",
      permissions: [],
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      lastName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please enter a valid email address",
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Please enter a valid phone number",
    },
  });

  //declare edit form
  const editForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      _id: "",
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      role: "",
      isActive: true,
      permissions: [] as string[],
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      lastName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please enter a valid email address",
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Please enter a valid phone number",
    },
  });

  const rows = sortedEmployees.map((admin) => (
    <tr>
      <td>{admin.id}</td>
      <td>{admin.firstName + " " + admin.lastName}</td>
      <td>{admin.email}</td>
      <td>{admin.phone}</td>
      <td>
        {admin.role === "tax official" ? (
          <Badge
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
          >
            Tax Official
          </Badge>
        ) : (
          <Badge variant="gradient" gradient={{ from: "orange", to: "red" }}>
            Support Agent
          </Badge>
        )}
      </td>
      <td>{admin.createdAt.slice(0, 10)}</td>
      <td>
        {admin.isActive ? (
          <Badge fullWidth>Active</Badge>
        ) : (
          <Badge color="gray" fullWidth>
            Disabled
          </Badge>
        )}
      </td>
      <td>
        <Box
          w={100}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Tooltip label="Edit Admin">
            <ActionIcon
              onClick={() => {
                setEditOpened(true);
                editForm.setValues({
                  _id: admin._id,
                  id: admin.id,
                  firstName: admin.firstName,
                  lastName: admin.lastName,
                  email: admin.email,
                  phone: admin.phone,
                  gender: admin.gender,
                  permissions: admin.permissions,
                  role: admin.role,
                  isActive: admin.isActive === "true" ? true : false,
                });
              }}
            >
              <IconEdit size="24px" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete Admin">
            <ActionIcon onClick={() => openDeleteModal(admin.id)} color="red">
              <IconTrash size="24px" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Box>
      </td>
    </tr>
  ));

  //fetch data from api and assign to admins
  const { isLoading } = useQuery("admins", getAdmins, {
    onSuccess: (data) => {
      notifications.show({
        id: "loading-admins",
        color: "teal",
        title: "Data loaded successfully",
        icon: <IconCheck size={16} />,
        message: "Data loaded successfully",
        autoClose: 2000,
      });
    },
    onError: (error: any) => {
      notifications.show({
        id: "loading-admins",
        color: "red",
        title: "There was an error loading the data",
        icon: <IconAlertTriangle size={16} />,
        message: error.message,
        autoClose: 2000,
      });
    },
  });

  return (
    <>
      <Modal
        opened={addOpened}
        onClose={() => {
          addForm.reset();
          setAddOpened(false);
        }}
        title="Add Employee"
      >
        <form onSubmit={addForm.onSubmit((values) => {})}>
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...addForm.getInputProps("firstName")}
            required
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            {...addForm.getInputProps("lastName")}
            required
          />
          <Select
            label="Gender"
            placeholder="Select gender"
            {...addForm.getInputProps("gender")}
            required
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            {...addForm.getInputProps("email")}
            required
          />
          <TextInput
            label="Phone"
            placeholder="Enter phone"
            {...addForm.getInputProps("phone")}
            required
          />

          <Select
            label="Role"
            placeholder="Select role"
            {...editForm.getInputProps("role")}
            required
            data={[
              { value: "tax official", label: "Tax Official" },
              { value: "support agent", label: "Support Agent" },
            ]}
            defaultValue={addForm.values.role}
          />
          <Text mt={5} size={14} weight={500} color="gray.6">
            Permissions
          </Text>
          <Checkbox label="Manage Tax Rates" onClick={() => {}} mb={5} />
          <Checkbox label="Manage Notices" onClick={() => {}} mb={5} />
          <Checkbox label="Manage FAQs" onClick={() => {}} mb={5} />
          <Checkbox
            label="Manage Educational Resources"
            onClick={() => {}}
            mb={5}
          />
          <Button
            color="teal"
            sx={{ marginTop: "10px", width: "100%" }}
            type="submit"
          >
            Create
          </Button>
        </form>
      </Modal>
      <Modal
        opened={editOpened}
        onClose={() => {
          editForm.reset();
          setEditOpened(false);
        }}
        title="Edit Employee"
      >
        <form onSubmit={editForm.onSubmit((values) => {})}>
          <input {...editForm.getInputProps("_id")} readOnly required hidden />
          <TextInput
            label="Employee ID"
            readOnly
            required
            {...editForm.getInputProps("id")}
          />
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...editForm.getInputProps("firstName")}
            required
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            {...editForm.getInputProps("lastName")}
            required
          />
          <Select
            label="Gender"
            placeholder="Select gender"
            {...editForm.getInputProps("gender")}
            required
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            defaultValue={editForm.values.gender}
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            {...editForm.getInputProps("email")}
            required
          />
          <TextInput
            label="Phone"
            placeholder="Enter phone"
            {...editForm.getInputProps("phone")}
            required
          />
          <Select
            label="Role"
            placeholder="Select role"
            {...editForm.getInputProps("role")}
            required
            data={[
              { value: "tax official", label: "Tax Official" },
              { value: "support agent", label: "Support Agent" },
            ]}
            defaultValue={editForm.values.role}
          />
          <Select
            label="Status"
            placeholder="Select status"
            required
            data={[
              { value: "active", label: "Active" },
              { value: "deactivated", label: "Deactivated" },
            ]}
            defaultValue={editForm.values.isActive ? "active" : "deactivated"}
            onChange={(value) => {
              editForm.setValues({
                ...editForm.values,
                isActive: value === "active" ? true : false,
              });
            }}
          />
          <Text mt={5} size={14} weight={500} color="gray.6">
            Permissions
          </Text>
          <Checkbox
            label="Manage Tax Rates"
            onClick={() => {}}
            checked
            mb={5}
          />
          <Checkbox label="Manage Notices" onClick={() => {}} mb={5} />
          <Checkbox label="Manage FAQs" onClick={() => {}} checked mb={5} />
          <Checkbox
            label="Manage Educational Resources"
            onClick={() => {}}
            checked
            mb={5}
          />
          <Button
            color="teal"
            sx={{ marginTop: "10px", width: "100%" }}
            type="submit"
          >
            Update
          </Button>
        </form>
      </Modal>
      <Box sx={{ margin: "20px", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Search by any field"
            mb="md"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
            sx={{ width: "300px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            mb="md"
          >
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              sx={{ width: "200px", marginRight: "20px" }}
              onClick={() => setAddOpened(true)}
            >
              Add Employee
            </Button>
          </Box>
        </Box>
        <ScrollArea>
          <Table
            horizontalSpacing="0"
            verticalSpacing="xs"
            sx={{ tableLayout: "auto", width: "100%" }}
          >
            <thead>
              <tr>
                <Th
                  onSort={() => setSorting("id")}
                  sorted={sortBy === "id"}
                  reversed={reverseSortDirection}
                >
                  ID
                </Th>
                <Th
                  onSort={() => setSorting("firstName")}
                  sorted={sortBy === "firstName"}
                  reversed={reverseSortDirection}
                >
                  Name
                </Th>
                <Th
                  onSort={() => setSorting("email")}
                  sorted={sortBy === "email"}
                  reversed={reverseSortDirection}
                >
                  Email
                </Th>
                <Th
                  onSort={() => setSorting("phone")}
                  sorted={sortBy === "phone"}
                  reversed={reverseSortDirection}
                >
                  Phone
                </Th>
                <Th
                  onSort={() => setSorting("role")}
                  sorted={sortBy === "role"}
                  reversed={reverseSortDirection}
                >
                  Role
                </Th>
                <Th
                  onSort={() => setSorting("createdAt")}
                  sorted={sortBy === "createdAt"}
                  reversed={reverseSortDirection}
                >
                  Joined Date
                </Th>
                <Th
                  onSort={() => setSorting("isActive")}
                  sorted={sortBy === "isActive"}
                  reversed={reverseSortDirection}
                >
                  Status
                </Th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7}>
                    <Text weight={500} align="center">
                      Loading
                    </Text>
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <Text weight={500} align="center">
                      No items found
                    </Text>
                  </td>
                </tr>
              ) : (
                rows
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
};

export default ManageEmployees;
