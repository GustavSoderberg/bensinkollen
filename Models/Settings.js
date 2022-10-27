class Settings {

    ApiKeyGoogle = "AIzaSyCzqQiYF_9UIykdTOgr_rZvEYBM0ubhGco"
    RadiusConstant = 5
    RadiusCircle = 1000*this.RadiusConstant
    LatDelta = 0.04*this.RadiusConstant
    LngDelta = 0.04*this.RadiusConstant
    LogoWidth = 25
    LogoHeight = 43.3
    

}

const settings = new Settings()

export { settings }