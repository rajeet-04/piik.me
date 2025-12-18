import type { InferGetStaticPropsType } from "next";
import HomePage, { getStaticProps } from "./home";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// Legacy dashboard routes share the same static shell; route-level file keeps URL parity
const ProfilePage = (props: Props) => <HomePage {...props} />;

export { getStaticProps };
export default ProfilePage;
