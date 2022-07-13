import { memo } from "react";
import { useApi } from "../../hooks/useApi.hook";

const PageState: (
  Child: React.ComponentType<{ data: any }>,
  url: string
) => React.MemoExoticComponent<() => JSX.Element> = (Child, url) => {
  const StatedComponent = () => {
    const { data, error, loading } = useApi(url);
    if (error || !data) {
      return <div>Error...</div>;
    }
    if (loading || !data) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <Child data={data} />
      </>
    );
  };
  return memo(StatedComponent);
};

export default PageState;
