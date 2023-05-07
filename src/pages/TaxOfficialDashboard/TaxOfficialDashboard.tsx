import { Container, createStyles, Tabs } from "@mantine/core";
import { DashboardHeader } from "../../layout";
import { useNavigate, useParams } from "react-router-dom";
import { ManageAdmins, ManageEmployees } from "../../features";

const useStyles = createStyles((theme) => ({
  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "none",
    marginTop: -38,
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },

  panel: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

const TaxOfficialDashboard: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { tabValue } = useParams();

  const tabs = [
    { label: "Dashboard", value: "stats" },
    { label: "Tax Rates", value: "tax-rates" },
    { label: "Notices", value: "notices" },
    { label: "Educational Materials", value: "educational-materials" },
    { label: "FAQs", value: "faqs" },
  ];

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.value} key={tab.value} className={classes.tab}>
      {tab.label}
    </Tabs.Tab>
  ));

  return (
    <>
      <DashboardHeader />
      <Container>
        <Tabs
          defaultValue="stats"
          value={tabValue || "stats"}
          onTabChange={(value) => navigate(`/tax-official/dashboard/${value}`)}
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
            panel: classes.panel,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
          <Tabs.Panel value="stats">Dashboard</Tabs.Panel>
          <Tabs.Panel value="tax-rates">Tax Rates</Tabs.Panel>
          <Tabs.Panel value="notices">Notices</Tabs.Panel>
          <Tabs.Panel value="educational-materials">
            Educational Materials
          </Tabs.Panel>
          <Tabs.Panel value="faqs">FAQs</Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
};

export default TaxOfficialDashboard;
