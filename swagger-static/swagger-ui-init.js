
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/auth/registration": {
        "post": {
          "operationId": "AuthController_registration",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/registration-confirmation": {
        "post": {
          "operationId": "AuthController_registrationConfirmation",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ConfirmationCodeDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/registration-email-resending": {
        "post": {
          "operationId": "AuthController_registrationEmailResending",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmailDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_userLogin",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_userRefreshToken",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/password-recovery": {
        "post": {
          "operationId": "AuthController_userPasswordRecovery",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmailDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/new-password": {
        "post": {
          "operationId": "AuthController_userNewPassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NewPasswordDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/logout": {
        "post": {
          "operationId": "AuthController_userLogout",
          "parameters": [],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/me": {
        "get": {
          "operationId": "AuthController_getUser",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/security/devices": {
        "get": {
          "operationId": "DevicesController_getAllDevices",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Devices"
          ]
        },
        "delete": {
          "operationId": "DevicesController_deleteAllDevices",
          "parameters": [],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Devices"
          ]
        }
      },
      "/security/devices/{deviceId}": {
        "delete": {
          "operationId": "DevicesController_deleteDevicesByDeviceId",
          "parameters": [
            {
              "name": "deviceId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Devices"
          ]
        }
      },
      "/posts/{postId}": {
        "get": {
          "operationId": "PostsController_findPostById",
          "parameters": [
            {
              "name": "postId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Posts"
          ]
        },
        "delete": {
          "operationId": "PostsController_deletePostById",
          "parameters": [
            {
              "name": "postId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Posts"
          ]
        },
        "put": {
          "operationId": "PostsController_updatePostById",
          "parameters": [
            {
              "name": "postId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePostDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Posts"
          ]
        }
      },
      "/posts": {
        "post": {
          "operationId": "PostsController_createPost",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePostDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Posts"
          ]
        }
      },
      "/users/profile": {
        "put": {
          "operationId": "UsersController_updateProfile",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserProfileDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Users"
          ]
        },
        "get": {
          "operationId": "UsersController_findProfileByUserId",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/users/avatar": {
        "post": {
          "operationId": "UsersController_uploadImageForProfile",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/testing/all-data": {
        "delete": {
          "operationId": "ClearDbController_deleteAllData",
          "parameters": [],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Clear data of DB"
          ]
        }
      }
    },
    "info": {
      "title": "Instagram api",
      "description": "Instagram api",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "JWT-Auth": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http",
          "name": "JWT",
          "description": "Enter JWT token",
          "in": "header"
        }
      },
      "schemas": {
        "AuthDto": {
          "type": "object",
          "properties": {
            "login": {
              "type": "string",
              "description": "User login",
              "example": "John",
              "minLength": 3,
              "maxLength": 10
            },
            "password": {
              "type": "string",
              "description": "User password",
              "example": "string",
              "minLength": 6,
              "maxLength": 20
            },
            "email": {
              "type": "string",
              "description": "User email",
              "example": "user@example.com",
              "format": "email"
            }
          },
          "required": [
            "login",
            "password",
            "email"
          ]
        },
        "ConfirmationCodeDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "string",
              "description": "Confirmation code",
              "example": "someUUIDdsajkdsa-dsad-as-das-ddsa",
              "format": "email"
            }
          },
          "required": [
            "code"
          ]
        },
        "EmailDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User email",
              "example": "test@gmail.com",
              "format": "email"
            }
          },
          "required": [
            "email"
          ]
        },
        "NewPasswordDto": {
          "type": "object",
          "properties": {
            "newPassword": {
              "type": "string",
              "description": "newPassword",
              "example": "qwerty",
              "format": "newPassword",
              "minLength": 6,
              "maxLength": 20
            },
            "recoveryCode": {
              "type": "string",
              "description": "recoveryCode",
              "example": "123.4567",
              "format": "recoveryCode"
            }
          },
          "required": [
            "newPassword",
            "recoveryCode"
          ]
        },
        "CreatePostDto": {
          "type": "object",
          "properties": {
            "description": {
              "type": "String",
              "description": "Description",
              "example": "Post description",
              "minLength": 1,
              "maxLength": 500
            },
            "postPhoto": {
              "type": "object",
              "description": "Photo",
              "example": "Multipart form data",
              "format": "Binary"
            }
          },
          "required": [
            "description",
            "postPhoto"
          ]
        },
        "UpdatePostDto": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string",
              "description": "Post description",
              "example": "Hello world",
              "format": "String",
              "minLength": 1,
              "maxLength": 500
            }
          },
          "required": [
            "description"
          ]
        },
        "UserProfileDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Users name",
              "example": "string"
            },
            "surname": {
              "type": "string",
              "description": "User surname",
              "example": "string"
            },
            "dateOfBirthday": {
              "type": "string",
              "description": "User date of birthday",
              "example": "some date"
            },
            "city": {
              "type": "string",
              "description": "User city",
              "example": "string"
            },
            "aboutMe": {
              "type": "string",
              "description": "Information about user",
              "example": "string"
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
