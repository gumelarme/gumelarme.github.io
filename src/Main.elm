module Main exposing (..) 

import Browser
import Html exposing (Html, div, text)
import Html.Attributes exposing (attribute, href, class)

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
  { message: String
  }

type Msg
  = Name String

init : () -> (Model, Cmd Msg)
init _ = 
  ({message = "Nice thing you got there eh?"}, Cmd.none)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = 
  case msg of 
    Name name ->
      ( { model | message = name}, Cmd.none )


view : Model -> Html Msg
view model =
  div [ class "font-bold text-sm" ] [ text model.message ]
