export interface SellerDetails {
    userFname: string;
    userLname: string; 
    userContact: string;
    userEmail:  string;
    nationality: string;
    username: string;
    userpass: string;
    confpass: string;
    tempaddress: string;
    permanentaddress: string;
}

export interface ISelletLogin{
    username: string;
    password: string;
}

export interface IProductDetails{
    id: number;
    productName: string;
    productUnit: string;
    productPrice: number;
    productCategory: string;
    productSubcategory: string;
    productColor: string;
    productDesc: string;
    productImageUrl: string;
    prodQuantity: undefined | number; 
    productId: undefined | number;
}

export interface IUserSignUp{
    userSalutation: string;
    userName: string;
    userEmailId: string;
    userMobile: string;
    userPassword: string;
    userConfPassword: string;
    userAddress: string;
    userGender: string;
}

export interface ICart{
    id: number | undefined;
    productName: string;
    productUnit: string;
    productPrice: number;
    productCategory: string;
    productSubcategory: string;
    productColor: string;
    productDesc: string;
    productImageUrl: string;
    prodQuantity: undefined | number;
    userId: number;
    productId: number; 
}

export interface IPriceSummary{
    price: number,
    taxamount: number,
    discount: number,
    deliverycharges: number,
    total: number,
    count: number
}

export interface IOrderDetails{
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    address: string;
    address2: string;
    state: string;
    country: string;
    pincode: number;
    paymentmode: string;
    totalPrice: number;
    userId: number;
    id: number | undefined;
}

