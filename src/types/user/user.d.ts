
enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

interface User {
    name: String;
    email: String;
    status: String;
}

interface UserResponse extends User { }


export { User, UserResponse }

