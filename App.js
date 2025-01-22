import React, { useState, useEffect } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";

//Filtering a List View - Exercise 1C
//Create a new variable named orginalData
let orginalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  // useEffect - Exercise 1B
  useEffect(() => {
    //Add fetch() - Exercise 1A
    fetch(
      "https://mysafeinfo.com/api/data?list=humanbones&format=json&case=default"
    )
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        if (orginalData.length < 1) {
          const sortedData = myJson.sort((a, b) => a.ID - b.ID);
          setMydata(sortedData);
          orginalData = sortedData;
        }
      });
  }, []);

  //Filtering a List View - Exercise 1C
  const FilterData = (text) => {
    if (text != "") {
      let myFilteredData = orginalData.filter((item) =>
        item.BoneName.includes(text)
      );
      setMydata(myFilteredData);
    } else {
      setMydata(orginalData);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemBox}>
        <Text style={styles.itemID}>{item?.ID || "N/A"}</Text>
        <Text style={styles.itemTitle}>{item?.BoneName || "N/A"}</Text>
        <Text style={styles.itemText}>
          Alternate Name: {item?.AlternateName || "N/A"}
        </Text>
        <Text style={styles.itemText}>Area: {item?.Area || "N/A"}</Text>
        <Text style={styles.itemText}>Count: {item?.Count || "N/A"}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Human Bones</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by Bone Name..."
        placeholderTextColor="#b0c4de"
        onChangeText={(text) => {
          FilterData(text);
        }}
      />
      <FlatList
        data={mydata}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item?.ID || index).toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#e6f0ff",
    marginBottom: 20,
    fontSize: 16,
    color: "#003366",
  },
  itemBox: {
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#d4ffa3",
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001a33",
    marginBottom: 5,
    borderBottomColor: '#001a33',
    borderBottomWidth: 2,
  },
  itemText: {
    fontSize: 16,
    color: "#003366",
    marginVertical: 2,
  },
  itemID: {
    fontSize: 16,
    color: "#003366",
    marginVertical: 2,
    borderBottomColor: '#001a33',
    borderBottomWidth: 2,
  },
});

export default App;
