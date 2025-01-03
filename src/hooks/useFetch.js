import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export const useFetch = (url, method = "GET") => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const history = useHistory();

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();

        setIsPending(false);
        setData(data);
        setError(null);
        if (method === "POST") {
          history.push("/");
          toast.success("Recipe created successfully", { autoClose: 2000 });
        }
      } catch (error) {
        setIsPending(false);
        toast.error("Recipe not fetched", { autoClose: 2000 });
        if (error.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setError("couldn't fetch data");
          console.log(error.message);
        }
      }
    };

    if (method === "GET") {
      fetchData();
      // if (data) {
      //   toast.success("Data Fetched", { autoClose: 2000 });
      // }
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options, history]);
  return { data, isPending, error, postData };
};
