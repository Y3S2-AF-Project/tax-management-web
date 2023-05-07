import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertTriangle, IconCheck, IconHome } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { ILogin } from "../../interfaces/admin";
import { notifications, showNotification } from "@mantine/notifications";
import { adminLogin } from "../../services/Admin";

const TaxOfficialLogin = () => {
  const navigate = useNavigate();
  if (JSON.parse(localStorage.getItem("admin") || "{}").accessToken) {
    navigate("/admin/dashboard");
  }

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { email: "", password: "" },

    validate: {
      email: (value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
          ? null
          : "Invalid email",
    },
  });

  const login = async (values: ILogin) => {
    notifications.show({
      id: "admin-login",
      loading: true,
      title: "Validating credentials",
      message: "Please wait...",
      autoClose: false,
      withCloseButton: false,
    });
    adminLogin(values)
      .then((res) => {
        localStorage.setItem("admin", JSON.stringify(res.data.data));
        localStorage.setItem("role", "admin");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
        notifications.update({
          id: "admin-login",
          color: "teal",
          title: "Login successful",
          message: "redirecting to the admin dashboard",
          icon: <IconCheck size="16px" />,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        notifications.update({
          id: "admin-login",
          color: "red",
          title: "Login failed",
          icon: <IconAlertTriangle size={16} />,
          message: err.message,
          autoClose: 2000,
        });
      });
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Sign in to Tax Offcials Dashboard
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => login(values))}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
      <Link
        to="/"
        color="blue"
        style={{
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <IconHome size={20} color="#228BE6" />
        <Text align="center" ml={10} color={"blue"}>
          Go back to Home
        </Text>
      </Link>
    </Container>
  );
};

export default TaxOfficialLogin;
