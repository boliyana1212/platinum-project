import { IconContext } from "react-icons";
import styles from "./sidebar.module.css";
import {
  MdOutlineSpaceDashboard,
  MdOutlineTrendingDown,
  MdOutlineTrendingUp,
  MdWallet,
  MdPersonOutline,
} from "react-icons/md";
import WalletSummary from "../elements/WalletSummary";
import ExpenseForm from "../elements/ModalExpansesForm";
import IncomeForm from "../elements/ModalIncomeForm";

const Sidebar = () => {
  return (
    <>
      <div className={styles.container}>
        {/* sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarItem}>
            <ul>
              <a href="#">
                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                  <MdOutlineSpaceDashboard className={styles.icons} />
                </IconContext.Provider>
                Dashboard
              </a>
            </ul>
            <ul>
              <a href="#">
                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                  <MdOutlineTrendingDown className={styles.icons} />
                </IconContext.Provider>
                Expenses
              </a>
            </ul>
            <ul>
              <a href="#">
                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                  <MdOutlineTrendingUp className={styles.icons} />
                </IconContext.Provider>
                Incomes
              </a>
            </ul>
            <ul>
              <a href="#">
                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                  <MdWallet className={styles.icons} />
                </IconContext.Provider>
                Wallet
              </a>
            </ul>
            <ul>
              <a href="#">
                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                  <MdPersonOutline className={styles.icons} />
                </IconContext.Provider>
                Profile
              </a>
            </ul>
          </div>
        </div>
        {/* section for main content */}
        <div className={styles.pageContent}>
          <WalletSummary />
          <div className={styles.pageContentChild}>
            <IncomeForm />
            <ExpenseForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
