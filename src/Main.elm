module Main exposing (..)

import Browser
import Html exposing (Html, a, div, h1, h2, img, text)
import Html.Attributes exposing (attribute, class, href, src, title)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


type alias Model =
    { message : String
    , subMessage : String
    , profileImage : String
    , profileUrl : String
    }


type Msg
    = Name String


init : () -> ( Model, Cmd Msg )
init _ =
    ( { message = "Hi, "
      , subMessage = "The site is under constructions. Click the profile image to go to my github profile."
      , profileImage = "https://avatars.githubusercontent.com/u/24204176?v=4"
      , profileUrl = "https://www.github.com/gumelarme"
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Name name ->
            ( { model | message = name }, Cmd.none )


view : Model -> Html Msg
view model =
    div [ class "min-w-96 flex flex-col gap-4 md:gap-6 justify-center items-center h-full" ]
        [ profileImage model.profileImage model.profileUrl "visit my profile page!"
        , h1 [ class "text-4xl md:text-5xl text-primary" ] [ text model.message ]
        , h2 [ class "flex text-center w-80 text-xl md:text-2xl md:w-96" ] [ text model.subMessage ]
        ]


profileImage : String -> String -> String -> Html Msg
profileImage imageUrl profileUrl hoverTitle =
    a
        [ href profileUrl
        , class "border-4 border-transparent hover:border-primary border-solid rounded-full"
        ]
        [ img
            [ class "rounded-full w-64 wd:w-80"
            , src imageUrl
            , title hoverTitle
            ]
            []
        ]
