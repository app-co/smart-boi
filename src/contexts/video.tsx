import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

type VideoContextType = {
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <VideoContext.Provider value={{ isReady, setIsReady }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const PreloadVideo = () => {
  const { setIsReady } = useVideo();

  useEffect(() => {
    setIsReady(true);
  }, [setIsReady]);

  return null;
};


const VideoScreen = () => {
  const { isReady } = useVideo();

  return (
    <View style={styles.container}>
      {!isReady && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {isReady && (
        <YoutubePlayer
          height={300}
          play={true}
          videoId={'dQw4w9WgXcQ'} // Substitua pelo ID do seu vídeo
          onReady={() => console.log('Video is ready')}
        />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1,
  },
});
