import "@styles/globals.css";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
export const metadata = {
  title: "Promptopia",
  description: "Discouver & Share AI Prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>

        <div className="main ">
          <div className="gradient" />
        </div>
        <div className="app">
          <Nav />
          {children}
        </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
