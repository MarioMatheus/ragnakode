# Ragnakode
Simple Compiler to Ragnakode Programming Language

## Overview
Ragnakode is a simple language implemented for academic purposes.
Created for talk *Developing its first language* that addresses compilers content at **Weekomp II**, 
the IFCE Computer Week, an event focused on Computer Engineering that takes place every year at the Federal Institute of Ceará.

## Map
- [Web Page](https://ragnakode.herokuapp.com/)
- [Slides](dist/resources/talk-slides.pdf)
- [Compiler Structure](src/compiler)

## Ragnakode Grammar
  **command:** **str:** ```/STR/```
          | **sum:** ```/SUM/```
          | **sub:** ```/SUB/```
          | **mul:** ```/MUL/```
          | **div:** ```/DIV/```
          | **print:** ```/PRT/```
  **points:** ```/:/```
  **arg:** **identifier:** ```/[_]*[a-zA-Z][a-zA-Z0-9_]*/```
          | **number:** ```/-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/```

  *instructions* -> instructions instruction | instruction
  *instruction* -> identifier: operation
  *operation* -> command args
  *args* -> arg arg | arg | empty

## License
The project is licensed by the MIT License - see [LICENSE.md](LICENSE) for more details.
