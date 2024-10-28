import Toast from "@/components/Toast/Toast";

function page() {
  return (
    <div className="mt-24 ml-24">
      <Toast
        type="default"
        showTime={9999999}
        duration={500}
        toast={{ id: "123", title: "t123", content: "123", type: "default" }}
      />
      <Toast
        type="success"
        showTime={9999999}
        duration={500}
        toast={{ id: "123", title: "t123", content: "123", type: "success" }}
      />
      <Toast
        type="fail"
        showTime={999999}
        duration={500}
        toast={{ id: "123", title: "t123", content: "123", type: "fail" }}
      />
    </div>
  );
}

export default page;
