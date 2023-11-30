const Header = ({ children }: { children: string }) => {
  return (
    <h1 className='text-center text-uppercase text-primary h2 my-3'>
      {children}
    </h1>
  );
};

export default Header;
