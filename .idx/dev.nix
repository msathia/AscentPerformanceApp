{pkgs}: {
  channel = "unstable";
  packages = [
    pkgs.go_1_21
  ];
  env = {
    # Add GOROOT for go.
    # go will be available via PATH
    GOROOT = "${pkgs.go_1_21}";
    # Add PATH for go bins
    PATH = "${pkgs.go_1_21}/bin:${pkgs.coreutils}/bin:$PATH";
    # Add GOPATH for go
    GOPATH = "$HOME/go";
    # Add GOCACHE for go
    GOCACHE = "$HOME/.cache/go-build";
  };
  idx = {
    extensions = [
      # "vscodevim.vim"
      "golang.go"
    ];
    workspace = {
      onCreate = {default.openFiles = ["main.go"];};
    };
    previews = {
        web = {
          command = [
            "go"
            "run"
            "main.go"
          ];
          port = 8080;
          manager = "web";
        };
    };
  };
}

