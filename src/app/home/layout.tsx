export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    addnew: React.ReactNode;
  }>
) {
  const { children, addnew } = props;

  return (
    <>
      {children}
      {addnew}
      <div id="overlay"></div>
    </>
  );
}
