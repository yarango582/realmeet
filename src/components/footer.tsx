import React from "react";
import Container from "./container";
import Link from "./lib/link";

interface FooterHeaderProps {
  title: string;
}

function FooterHeader(props: FooterHeaderProps) {
  const { title } = props;

  return <h5 className="mb-5 font-medium text-2xl">{title}</h5>;
}

interface FooterParagraphProps {
  children: React.ReactNode;
}

function FooterParagraph(props: FooterParagraphProps) {
  const { children } = props;

  return <p className="mb-5">{children}</p>;
}

export default function Footer() {
  return (
    <div className="text-slate-300">
      <Container>
        <>
          <FooterHeader title="About" />
          <FooterParagraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo non officiis nostrum quae, autem dolore sapiente ullam ex eos architecto, eveniet, sed quaerat ipsa est! Hic adipisci dicta veritatis blanditiis.
          </FooterParagraph>
          <FooterHeader title="Contact" />
          <FooterParagraph>
            For any help or feedback, please contact{" "}
            <Link external href="mailto:support@realmeet.com">
              support@realmeet.com
            </Link>
            .
          </FooterParagraph>
          <FooterHeader title="Legal" />
          <FooterParagraph>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </FooterParagraph>
          <FooterParagraph>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </FooterParagraph>
        </>
      </Container>
    </div>
  );
}
