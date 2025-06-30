const AuthLayout = ({ children }) => {
    return (
        <div className="flex justify-center pt-20">
            {children}
            <Footer />
        </div>
    );
};

export default AuthLayout;
