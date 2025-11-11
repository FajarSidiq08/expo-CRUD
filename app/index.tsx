import { View } from "react-native";
import ListUser from "./user/listUser";
import { Button } from "react-native";
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View>
      <Button
        title="Tambah User"
        onPress={() => router.push("/user/createUser")}
      />

      <ListUser />
    </View>
  );
}
