export interface User {
    _id?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    phone?: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    addresses?: Address[]; // إذا كنت تحتاج لتخزين العناوين، فستحتاج إلى تعريف واجهة Address أيضًا
    cart?: CartItem[];    // إذا كنت تحتاج لتخزين سلة التسوق، فستحتاج إلى تعريف واجهة CartItem أيضًا
    favorites?: string[]; // افترضت أن المفضلات عبارة عن مصفوفة من المعرفات
    messages?: Message[]; // إذا كنت تحتاج لتخزين الرسائل، فستحتاج إلى تعريف واجهة Message أيضًا
    notifications?: Notification[]; // إذا كنت تحتاج لتخزين الإشعارات، فستحتاج إلى تعريف واجهة Notification أيضًا
    orders?: Order[];  // إذا كنت تحتاج لتخزين الطلبات، فستحتاج إلى تعريف واجهة Order أيضًا
    payments?: Payment[]; // إذا كنت تحتاج لتخزين المدفوعات، فستحتاج إلى تعريف واجهة Payment أيضًا
    points?: number;  // افترضت أن النقاط عبارة عن عدد صحيح
    reviews?: Review[]; // إذا كنت تحتاج لتخزين المراجعات، فستحتاج إلى تعريف واجهة Review أيضًا
    totalAddresses?: number;
    totalCart?: number;
    totalFavorites?: number;
    totalMessages?: number;
    totalNotifications?: number;
    totalOrders?: number;
    totalPayments?: number;
    totalPoints?: number;
    totalProducts?: number;
    totalReviews?: number;
    totalSpent?: number;
    totalWishlist?: number;
    wishlist?: string[];  // افترضت أن قائمة الأمنيات عبارة عن مصفوفة من المعرفات
    isActive?: boolean;
    isBlocked?: boolean;
    lastLogin?: string;
    isVerified?: boolean;
  }

  // تعريف الواجهات المساعدة للمصفوفات إذا لزم الأمر
  export interface Address {
    // الخصائص التي تحتاجها للعناوين
  }

  export interface CartItem {
    // الخصائص التي تحتاجها لعناصر السلة
  }

  export interface Message {
    // الخصائص التي تحتاجها للرسائل
  }

  export interface Notification {
    // الخصائص التي تحتاجها للإشعارات
  }

  export interface Order {
    // الخصائص التي تحتاجها للطلبات
  }

  export interface Payment {
    // الخصائص التي تحتاجها للمدفوعات
  }

  export interface Review {
    // الخصائص التي تحتاجها للمراجعات
  }
