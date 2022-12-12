import { WebView } from 'react-native-webview';
import { RouteProp, useRoute } from "@react-navigation/native";

const YahooScreen = () => {

    const route: RouteProp<any> = useRoute();

    return (

        <WebView

              source={{ uri: `https://finance.yahoo.com/quote/${route.params?.symbol}` }}
        />
    );

}

export default YahooScreen;