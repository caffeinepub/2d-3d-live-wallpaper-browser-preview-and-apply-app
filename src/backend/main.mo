import List "mo:core/List";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type WallpaperType = {
    #twoD;
    #live;
    #threeD;
  };

  type WallpaperMeta = {
    id : Text;
    title : Text;
    wType : WallpaperType;
    thumbnail : Text;
    preview : Text;
  };

  let builtInWallpapers : [WallpaperMeta] = [
    {
      id = "wp1";
      title = "Serene Lake";
      wType = #twoD;
      thumbnail = "assets/thumbnails/lake_thumb.jpg";
      preview = "assets/2d/lake.jpg";
    },
    {
      id = "wp2";
      title = "Pulsating Waves";
      wType = #live;
      thumbnail = "assets/thumbnails/waves_thumb.gif";
      preview = "assets/live/waves_animation.webm";
    },
    {
      id = "wp3";
      title = "Starfield 3D";
      wType = #threeD;
      thumbnail = "assets/thumbnails/starfield_thumb.jpg";
      preview = "scene_starfield";
    },
  ];

  let userFavoritesMap = Map.empty<Principal, List.List<Text>>();

  public query ({ caller }) func getWallpaperCatalog() : async [WallpaperMeta] {
    builtInWallpapers;
  };

  public shared ({ caller }) func addFavorite(wallpaperId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add favorites");
    };

    var favorites = switch (userFavoritesMap.get(caller)) {
      case (null) { List.empty<Text>() };
      case (?existing) { existing };
    };

    if (favorites.contains(wallpaperId)) { return };

    favorites.add(wallpaperId);
    userFavoritesMap.add(caller, favorites);
  };

  public shared ({ caller }) func removeFavorite(wallpaperId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove favorites");
    };

    switch (userFavoritesMap.get(caller)) {
      case (null) { () };
      case (?favorites) {
        let filtered = favorites.values().filter(func(id) { id != wallpaperId }).toList();
        userFavoritesMap.add(caller, filtered);
      };
    };
  };

  public query ({ caller }) func getFavorites() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view favorites");
    };

    switch (userFavoritesMap.get(caller)) {
      case (null) { [] };
      case (?favorites) { favorites.toArray() };
    };
  };

  public query ({ caller }) func isFavorite(wallpaperId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check favorites");
    };

    switch (userFavoritesMap.get(caller)) {
      case (null) { false };
      case (?favorites) { favorites.contains(wallpaperId) };
    };
  };
};
