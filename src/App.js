import "./App.css";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import "@/assets/css/common.less";
import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import Parent from "./Parent";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { RecoilRoot } from "recoil";

function App() {
  const element = useRoutes(routes);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  useEffect(() => {
    setB(b + 1);
  }, [a]);
  function result() {
    let sum = 0;
    for (let i = 0; i < a * 10; i++) {
      sum += i;
    }
    return sum;
  }
  const result2 = useMemo(() => {
    return a;
  }, []);

  const fn = () => {
    // console.log("a:", a)
  };

  const fb = useCallback(() => {
    // console.log("fb:", a)
  }, []);

  return (
    <div className="App">
      <RecoilRoot>
        <ConfigProvider locale={zhCN}>
          <Suspense fallback={<div>loading</div>}>{element}</Suspense>
        </ConfigProvider>
        {/* <h1>{result()}</h1>
        <p>点击{a}次</p>
        <p onClick={fn}>fn click</p>
        <p onClick={fb}>fb click</p>
        <button onClick={() => setA(a + 1)}>click</button>
        <Parent /> */}
      </RecoilRoot>
    </div>
  );
}

export default App;
