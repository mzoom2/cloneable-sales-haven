
import { Helmet } from "react-helmet";

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <Helmet>
      <title>{title} | UEEPhones</title>
    </Helmet>
  );
};

export default Title;
