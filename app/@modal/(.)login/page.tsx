import { Modal } from "@/components/modal";
import { LoginPanel } from "@/components/login-panel";

export default async function LoginModal(props: PageProps<"/login">) {
  const searchParams = await props.searchParams;
  const nextParam = searchParams.next;
  const next = typeof nextParam === "string" ? nextParam : "/";

  return (
    <Modal>
      <LoginPanel next={next} />
    </Modal>
  );
}
