export interface UserData {
    /**
     * Created by eugene on 12/14/17.
     */
     _id: string;
    firstname: string;
    lastname: string;
    email: string;
    class: number;
    age: number;
    avatar: string;
}
/**
 * Created by eugene on 12/22/17.
 */
export interface ClassData {
    /**
     * Created by eugene on 12/14/17.
     */
    _id: string;
    name: string;

}
export interface ChatRoomData {
    /**
     * Created by eugene on 12/14/17.
     */
    _id: string;
    action_user_id: string;
    user: UserData;

}
