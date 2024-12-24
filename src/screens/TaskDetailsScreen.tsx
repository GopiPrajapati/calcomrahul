import React, {FC} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import {TaskDetailsScreenProps} from '../interfaces/TaskDetailsScreenProps';

const TaskDetailsScreen: FC<TaskDetailsScreenProps> = ({route}) => {
  const {task} = route?.params ?? {};

  return (
    <View style={styles.container}>
      {/* Task Name */}
      <Text style={styles.detailsTitle}>{task.name}</Text>
      {/* Task Description */}
      <Text style={styles.detailsDescription}>{task.description}</Text>
      {/* Images & Videos */}
      <FlatList
        data={task?.images}
        renderItem={item => {
          return <Image source={{uri: item?.item}} style={styles.image} />;
        }}
        ListFooterComponent={() => (
          <FlatList
            data={task?.videos}
            keyExtractor={(item, index) => String(index)}
            renderItem={item => {
              return (
                <View
                  style={{
                    marginHorizontal: wp(2),
                    marginVertical: hp(1),
                  }}>
                  <Video
                    source={{uri: item.item}}
                    fullscreenAutorotate={true}
                    controls
                    style={styles.video}
                  />
                </View>
              );
            }}
            contentContainerStyle={{
              alignItems: 'center',
            }}
          />
        )}
      />

      {/* 
      <FlatList
        data={task?.videos}
        keyExtractor={item => item?.id}
        renderItem={item => {
          //   const {node} = item?.item ?? {};
          return (
            <View
              style={{
                marginHorizontal: wp(2),
                marginVertical: hp(1),
              }}>
              <Video
                // Can be a URL or a local file.
                source={{uri: item.item}}
                fullscreenAutorotate={true}
                // Store reference
                controls
                // ref={videoRef}
                // Callback when remote video is buffering
                // onBuffer={onBuffer}
                // Callback when video cannot be loaded
                // onError={onError}
                style={styles.video}
              />
            </View>
          );
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      /> */}
    </View>
  );
};

export default TaskDetailsScreen;

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
  video: {height: hp(40), width: wp(80)},
});
