"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { get_all_chat_numbers } from "@/routes/chat/chatRoutes";
import { PaginationComponent } from "@/components/Pagination/PaginationComponent";
import { AlertDialogDemo } from "@/components/AlertDialog/AlertDialog";

// -------------types-----------------
type variant = "default" | "destructive";
type Alert = {
  open: boolean;
  message: string;
  description: string;
  variant: variant;
};

const page = () => {
  const router = useRouter();
  // state for backend data
  const [phoneData, setPhoneData] = React.useState<any[]>([]);
  // state for loading
  const [loading, setLoading] = React.useState(false);
  // --------- alert for success and error messages ---------
  const [alert, setAlert] = React.useState<Alert>({
    open: false,
    message: "",
    description: "",
    variant: "default",
  });
  // --------- state for search value ---------
  const [searchValue, setSearchValue] = React.useState("");
  // --------- state for pagination ---------
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [noOfPages, setNoOfPages] = React.useState(0);
  const [noOfRecords, setNoOfRecords] = React.useState(0);

  useEffect(() => {
    fetchPhoneDetails(pageNo, pageSize, searchValue);
  }, []);

  const fetchPhoneDetails = async (
    pageNo: number,
    pageSize: number,
    searchValue: string
  ) => {
    // -------- prevent multiple loading
    if (loading) return;
    let params = {
      pageNo,
      pageSize,
    };
    try {
      setLoading(true);
      const data = (await get_all_chat_numbers(params, searchValue)) as any; // Adjust type as necessary
      if (data && data.success) {
        setPhoneData(data.response.details || []);
        setNoOfPages(data.response.noOfPages);
        setNoOfRecords(data.response.noOfRecords);
        setLoading(false);
      } else {
        setAlert({
          open: true,
          message: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      setAlert({
        open: true,
        message: "Error",
        description: "Error fetching user groups data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex flex-col items-center">
        {loading && (
          <div className="fixed top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
            <Loader size={40} className="text-blue-500" />
          </div>
        )}
        <div className="flex flex-col w-full items-center mb-5">
          <div className="text-2xl font-bold text-blue-700">AI Chats</div>
        </div>
        {/* create the table with phone number in  phoneData*/}
        <div className="w-full">
          {phoneData && phoneData.length > 0 ? (
            <div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    {/* <th className="px-4 py-2 border-b">Phone Number</th> */}
                  </tr>
                </thead>
                <tbody>
                  {phoneData.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b">{item.sessionId}</td>
                      <td className="px-4 py-2 border-b">
                        <span
                          className="text-blue-500 cursor-pointer ml-2"
                          onClick={() => {
                            router.push(`/user/ai_chat/view_chat?phone=${item.sessionId}`);
                          }}
                        >
                          View Chat
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-stroke py-4 ">
                <PaginationComponent
                  currentPage={pageNo}
                  totalPages={noOfPages}
                  onPageChange={(currentPage) => {
                    setPageNo(currentPage);
                    fetchPhoneDetails(currentPage, pageSize, searchValue);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="mt-10 text-gray-500 text-center font-bold text-xl flex flex-col items-center">
              No data available
            </div>
          )}
        </div>
      </div>
      <AlertDialogDemo
        isOpen={alert.open}
        title={alert.message}
        description={alert.description}
        variant={alert.variant}
        handleCancel={() => {
          setAlert({ ...alert, open: false });
        }}
      />
    </div>
  );
};
export default page;
