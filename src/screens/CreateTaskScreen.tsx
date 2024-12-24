import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import MText from '../components/Text/MText';
import {CreateTaskScreenProps} from '../interfaces/CreateTaskScreenProps';
import colors from '../utitlity/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTaskContext} from '../context/AppContext';

const CreateTaskScreen: FC<CreateTaskScreenProps> = ({route, navigation}) => {
  // const {setTasks, onTaskSave} = route?.params ?? {};

  const {setTasks} = useTaskContext();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleSave = () => {
    const newTask = {
      id: Date.now().toString(),
      name,
      description,
      date: new Date().toISOString().split('T')[0],
      videos,
      images,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    // onTaskSave(newTask);
    navigation.goBack();
  };

  useEffect(() => {}, []);

  const getAllTheURI = (data: any) => {
    let uris: any = [];
    data.forEach(item => {
      if (item.node?.image?.uri) {
        uris.push(item.node.image.uri);
      }
    });
    return uris;
  };

  const getPhotos = async () => {
    await CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(async r => {
        console.log('r.eges', JSON.stringify(r.edges, null, 4));
        const res = getAllTheURI(r.edges);
        setImages(res);
      })
      .catch(err => {
        // console.log('err', err);
      });
  };

  const getVideos = async () => {
    await CameraRoll.getPhotos({
      first: 20,
      assetType: 'Videos',
    })
      .then(async r => {
        const res = getAllTheURI(r.edges);
        setVideos(res);
      })
      .catch(err => {
        // console.log('err', err);
      });
  };

  return (
    // <ScrollView style={{flexGrow: 1}}>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <TextInput
          placeholder="Task Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addImageCon} onPress={getPhotos}>
          <MText kind="h3" color={colors.white}>
            Add Image
          </MText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addImageCon} onPress={getVideos}>
          <MText kind="h3" color={colors.white}>
            Add Videos
          </MText>
        </TouchableOpacity>
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(item, index) => String(index)}
          // keyExtractor={item => item?.id}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          renderItem={item => {
            // const {node} = item?.item ?? {};
            return (
              <View
                style={{
                  marginHorizontal: wp(2),
                  marginVertical: hp(1),
                }}>
                <Image
                  source={{uri: item?.item}}
                  height={hp(15)}
                  width={wp(43)}
                  // style={{height: '100%', width: '50%'}}
                />
              </View>
            );
          }}
        />
        <FlatList
          data={videos}
          // keyExtractor={item => item?.id}
          keyExtractor={(item, index) => String(index)}
          renderItem={item => {
            // const {node} = item?.item ?? {};
            return (
              <View
                style={{
                  marginHorizontal: wp(2),
                  marginVertical: hp(1),
                }}>
                <Video
                  // Can be a URL or a local file.
                  source={{uri: item.item}}
                  controls
                  fullscreenAutorotate={true}
                  style={{height: hp(40), width: wp(80)}}
                />
              </View>
            );
          }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
        />

        <Button title="Save Task" onPress={handleSave} />
      </View>
    </KeyboardAwareScrollView>
  );
};
export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  dateButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedDate: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  dateText: {
    color: '#fff',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  taskItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 5,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  addImageCon: {
    backgroundColor: colors.blue,
    paddingVertical: hp(1),
    borderRadius: hp(1),
    alignItems: 'center',
    marginVertical: hp(1),
  },
});
