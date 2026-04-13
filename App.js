import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  background: "#FAF7F2",
  surface: "#FFFFFF",
  border: "#E8E2D9",
  text: "#1A1A1A",
  mutedText: "#6B6B6B",
  subtleText: "#9A9A9A",
  primary: "#5C8B6E",
  terracotta: "#C4784A",
  shadow: "rgba(35, 27, 16, 0.08)",
  highlight: "#F1E8D7",
  chipTint: "#EEF4EF",
};

const FEED_POSTS = [
  {
    id: "1",
    caption: "Rohan showed incredible focus during block building today, and his spatial reasoning is really starting to bloom.",
    children: ["Rohan", "Aarav", "Priya"],
    timeAgo: "2 hours ago",
    viewCount: "14 / 18 parents viewed",
    palette: ["#F6D8A8", "#F0A36B", "#E8EFE1"],
  },
  {
    id: "2",
    caption: "Our finger-painting circle turned into a lesson in colour mixing, turn-taking, and very proud little smiles.",
    children: ["Meera", "Kabir"],
    timeAgo: "Yesterday",
    viewCount: "17 / 18 parents viewed",
    palette: ["#F8D3C2", "#E7A5A3", "#F5E8B8"],
  },
  {
    id: "3",
    caption: "Morning music time helped the class settle beautifully, and everyone joined in on the rhythm game.",
    children: ["Class highlight"],
    timeAgo: "2 days ago",
    viewCount: "16 / 18 parents viewed",
    palette: ["#D8E7D3", "#ACC9A4", "#F8E6CF"],
  },
];

const TABS = [
  { key: "Feed", icon: "home-outline" },
  { key: "Attendance", icon: "calendar-clear-outline" },
  { key: "Roster", icon: "people-outline" },
  { key: "Profile", icon: "person-outline" },
];

function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf"),
    Inter_600SemiBold: require("@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf"),
    Fraunces_400Regular_Italic: require("@expo-google-fonts/fraunces/400Regular_Italic/Fraunces_400Regular_Italic.ttf"),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingScreen} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.screen}>
          <Header />
          <OfflineBanner />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sectionRow}>
              <Text style={styles.sectionLabel}>Today . No posts yet</Text>
              <View style={styles.sectionDivider} />
            </View>

            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Yesterday</Text>
            </View>

            {FEED_POSTS.map((post, index) => (
              <PostCard key={post.id} post={post} isPartial={index === 2} />
            ))}
          </ScrollView>

          <Pressable style={styles.fab}>
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </Pressable>

          <BottomTabs />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.logoCircle}>
          <Ionicons name="sunny" size={16} color={COLORS.terracotta} />
          <MaterialCommunityIcons
            name="leaf"
            size={14}
            color={COLORS.primary}
            style={styles.logoLeaf}
          />
        </View>
        <View>
          <Text style={styles.schoolName}>Sunshine Preschool</Text>
          <Text style={styles.className}>LKG A</Text>
        </View>
      </View>
      <Pressable style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={22} color={COLORS.mutedText} />
      </Pressable>
    </View>
  );
}

function OfflineBanner() {
  return (
    <View style={styles.offlineBanner}>
      <Ionicons name="cloud-offline-outline" size={16} color="#FFFFFF" />
      <Text style={styles.offlineText}>You're offline - showing saved content</Text>
    </View>
  );
}

function PostCard({ post, isPartial }) {
  return (
    <Pressable style={[styles.card, isPartial && styles.partialCard]}>
      <LinearGradient
        colors={post.palette}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.photo}
      >
        <View style={styles.photoScene}>
          <View style={styles.photoSun} />
          <View style={styles.photoTable} />
          <View style={styles.photoKidsRow}>
            <View style={[styles.photoKid, styles.photoKidLarge]} />
            <View style={styles.photoKid} />
            <View style={[styles.photoKid, styles.photoKidSmall]} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.cardBody}>
        <Text style={styles.caption}>{post.caption}</Text>

        <View style={styles.chipsRow}>
          {post.children.map((child) => (
            <View key={child} style={styles.chip}>
              <Text style={styles.chipText}>{child}</Text>
            </View>
          ))}
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{post.timeAgo}</Text>
          <View style={styles.viewsRow}>
            <Ionicons name="eye-outline" size={14} color={COLORS.subtleText} />
            <Text style={styles.metaText}>{post.viewCount}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function BottomTabs() {
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => {
        const active = tab.key === "Feed";
        return (
          <Pressable key={tab.key} style={styles.tabItem}>
            <Ionicons
              name={tab.icon}
              size={21}
              color={active ? COLORS.primary : COLORS.subtleText}
            />
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
              {tab.key}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoLeaf: {
    position: "absolute",
    right: 5,
    bottom: 5,
  },
  schoolName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: COLORS.text,
  },
  className: {
    marginTop: 2,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: COLORS.mutedText,
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  offlineBanner: {
    height: 40,
    marginHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.terracotta,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  offlineText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: COLORS.subtleText,
  },
  sectionDivider: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
  },
  dateRow: {
    marginBottom: 10,
  },
  dateLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: COLORS.mutedText,
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
  },
  partialCard: {
    marginBottom: -92,
  },
  photo: {
    width: "100%",
    aspectRatio: 4 / 3,
    justifyContent: "space-between",
    padding: 18,
  },
  photoScene: {
    flex: 1,
    justifyContent: "space-between",
  },
  photoSun: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 248, 223, 0.92)",
  },
  photoTable: {
    height: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginBottom: 10,
  },
  photoKidsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  photoKid: {
    width: 76,
    height: 108,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
  },
  photoKidLarge: {
    height: 124,
  },
  photoKidSmall: {
    width: 62,
    height: 96,
  },
  cardBody: {
    padding: 12,
  },
  caption: {
    fontFamily: "Fraunces_400Regular_Italic",
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  chip: {
    minHeight: 28,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
  },
  chipText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#FFFFFF",
  },
  metaRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  viewsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: COLORS.subtleText,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 88,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(92, 139, 110, 0.35)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 8,
  },
  tabBar: {
    height: 72,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: COLORS.subtleText,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontFamily: "Inter_600SemiBold",
  },
});

export default App;
