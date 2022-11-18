import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Awesome from "react-native-vector-icons/FontAwesome5";

function About({ navigation }) {
  /** Variable in useState */
  var [Username, setFindUser] = useState("");
  var [ID, setID] = useState("");
  var [Fname, setfname] = useState("");
  var [Lname, setlname] = useState("");
  var [Uname, setUname] = useState("");
  var [Pword, setPname] = useState("");
  const [securepass, setSecurepass] = useState(true);

  /**function that is called when FIND button is pressed */
  const searchUser = () => {
    /**Passing the Username entered by user to findUser variable */
    var findUser = Username;

    /**validations */
    if (findUser.length == 0) {
      alert("Required filed is missing.");
    } else {
      var SearchAPIURL = "http://192.168.1.55/SampleProject/api/search.php";

      var header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        FindUser: findUser,
      };

      fetch(SearchAPIURL, {
        method: "POST",
        headers: header,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        /**Getting the data from search API */
        .then((response) => {
          setID(response[0].ID);
          setfname(response[0].FirstName);
          setlname(response[0].LastName);
          setUname(response[0].Username);
          setPname(response[0].Password);
        })
        .catch(() => {
          alert("No record found.");
        });
    }
  };

  const updateUser = () => {
    var UpdateAPIURL = "http://192.168.1.55/SampleProject/api/update.php";

    var header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var Data = {
      ID: ID,
      FirstName: Fname,
      LastName: Lname,
      Username: Uname,
      Password: Pword,
    };

    fetch(UpdateAPIURL, {
      method: "POST",
      headers: header,
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteUser = () => {
    var deleteAPIURL = "http://192.168.1.55/SampleProject/api/delete.php";

    var header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(deleteAPIURL, {
      method: "POST",
      headers: header,
      body: JSON.stringify({ ID: ID }),
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.text}
            placeholder="Type user's name"
            onChangeText={(anytext) => setFindUser(anytext)}
          />
          <TouchableOpacity style={styles.findbtn} onPress={searchUser}>
            <Text style={{ color: "#fff" }}>
              <Awesome name="search" color={"#fff"} />
              Find user
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ textDecorationLine: "underline", padding: 5 }}>
              {" "}
              Signup{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ResultContainer}>
          <Text style={{ fontSize: 25, alignSelf: "center", margin: 5 }}>
            User Data
          </Text>
          <Text>ID:</Text>
          <TextInput style={styles.text} value={ID} editable={false} />
          <Text> Firstname:</Text>
          <TextInput
            style={styles.text}
            defaultValue={Fname}
            onChangeText={(anytext) => setfname(anytext)}
          />
          <Text>Lastname:</Text>
          <TextInput
            style={styles.text}
            defaultValue={Lname}
            onChangeText={(anytext) => setlname(anytext)}
          />
          <Text>Username:</Text>
          <TextInput
            style={styles.text}
            defaultValue={Uname}
            onChangeText={(anytext) => setUname(anytext)}
          />
          <Text>Password:</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <TextInput
              style={styles.text}
              defaultValue={Pword}
              secureTextEntry={securepass}
              onChangeText={(anytext) => setPname(anytext)}
            />
            <TouchableOpacity onPress={() => setSecurepass(!securepass)}>
              <Awesome
                style={{}}
                name={securepass ? "eye" : "eye-slash"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity style={styles.updatebtn} onPress={updateUser}>
              <Text> Update </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delbtn} onPress={deleteUser}>
              <Text> Delete </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 5,
  },
  findbtn: {
    alignItems: "center",
    backgroundColor: "orangered",
    padding: 10,
    borderRadius: 25,
  },
  text: {
    padding: 5,
    borderWidth: 2,
    margin: 3,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#000",
    width: "90%",
    alignSelf: "center",
  },
  searchContainer: {
    margin: 10,
    paddingTop: 20,
    flex: 1,
  },
  ResultContainer: {
    margin: 15,
    flex: 4,
  },
  updatebtn: {
    alignItems: "center",
    backgroundColor: "#32cd32",
    padding: 10,
    borderRadius: 25,
    width: "30%",
  },
  delbtn: {
    alignItems: "center",
    backgroundColor: "#cd5c5c",
    padding: 10,
    borderRadius: 25,
    width: "30%",
  },
});
